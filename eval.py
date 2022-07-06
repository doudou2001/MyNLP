# -*- coding: UTF-8 -*-
import re
import jieba
from model import Model
import torch as T
from data_util import config, data
from data_util.data import Vocab
from data_util.batcher import Example, Batch
from train_util import get_enc_data
from beam_search import beam_search

# 这里对应输入的文章
text = "近日，习近平总书记对全国春季农业生产工作作出重要指示强调：“当前，要在严格落实分区分级差异化疫情防控措施的同时，全力组织春耕生产，确保不误农时，保障夏粮丰收。”在统筹推进新冠肺炎疫情防控和经济社会发展工作部署会议上，总书记就不失时机抓好春季农业生产也作了专门部署。习近平总书记的重要指示，再次强调了“三农”工作重中之重的位置，指出抓紧春耕生产的重要性和紧迫性，我们要深刻领会、切实贯彻。农时不等人。作为全年农业生产第一仗，春耕生产直接关系夏粮收成和全年粮食产量稳定，唯有紧紧抓好春耕生产，才能把握全年农业生产的主动权。正如习近平总书记所强调：“越是面对风险挑战，越要稳住农业，越要确保粮食和重要副食品安全。”不失时机抓好春季农业生产，要增强问题意识，突出问题导向，着力解决春耕生产中的紧要问题，确保防控疫情与春耕备耕两不误。当前，要以针对性的措施打通农资供应、农机作业、农民下田等堵点，尽快恢复农业生产秩序。面对农资产能隐忧，有必要将种子、化肥、农药等农资生产企业纳入复工复产重点企业名单，支持农资企业加快复产，增加市场供应，保障春耕生产需要。春耕生产不能等待，疫情防控也不能麻痹。农村是疫情防控的薄弱地区，需要多措并举为春耕生产做好安全保障。农村疫情防控工作要接地气、入人心，让农村群众进一步深刻认识疫情带来的严重危害及疫情防控的重要性，从思想上增强防控意识，做好自我防护；防控布局要站好岗、织密网，保障农村地区疫情防护物资的充足，将监控点、消毒点延伸到田间地头，让农民放心投入生产；要按照分区分级的方略，因地制宜、因时制宜，尽量采取分散式、错峰式的作业方式，避免大规模人群聚集式作业。一年之计在于春，春耕备耕正当时。遵循习近平总书记重要指示精神，各地区各相关部门要切实担负起稳定农业生产的责任，统筹兼顾、精准施策、全力以赴，抓紧抓实抓细春耕生产工作。要稳定春播面积，抓好粮食生产，把饭碗牢牢端在自己手上，为打赢疫情防控阻击战、实现今年经济社会发展目标任务提供有力支撑，在祖国的广袤田野播种春天的希望。"


def preprocess(x):
    x = str(x).replace('\r', '').replace('\n',
                                         '').replace('\t',
                                                     '').replace(' ', '')
    regex = re.compile(r"[()，+-.、。；！：《》（）:——“”？_【】\/]")
    x = regex.sub('', x)
    mytext = jieba.cut(x, cut_all=False)
    print(mytext)
    return ' '.join(mytext)


def get_cuda(tensor):
    if T.cuda.is_available():
        tensor = tensor.cuda()
    return tensor


def get_title(text):
    text = preprocess(text)

    vocab = Vocab(config.demo_vocab_path, config.demo_vocab_size)

    model = Model()
    model = get_cuda(model)
    checkpoint = T.load(config.model_path)
    model.load_state_dict(checkpoint["model_dict"])

    start_id = vocab.word2id(data.START_DECODING)
    end_id = vocab.word2id(data.STOP_DECODING)
    unk_id = vocab.word2id(data.UNKNOWN_TOKEN)

    example = Example(' '.join(jieba.cut(text)), '', vocab)
    batch = Batch([example], vocab, 1)
    enc_batch, enc_lens, enc_padding_mask, enc_batch_extend_vocab, extra_zeros, ct_e = get_enc_data(batch)
    with T.autograd.no_grad():
        enc_batch = model.embeds(enc_batch)
        enc_out, enc_hidden = model.encoder(enc_batch, enc_lens)
        pred_ids = beam_search(enc_hidden, enc_out, enc_padding_mask, ct_e,
                               extra_zeros, enc_batch_extend_vocab,
                               model, start_id, end_id, unk_id)

    for i in range(len(pred_ids)):
        decoded_words = data.outputids2words(pred_ids[i], vocab, batch.art_oovs[i])
        decoded_words = "".join(decoded_words)

    # print(decoded_words)
    return decoded_words


if __name__ == "__main__":
    print(get_title(text))

