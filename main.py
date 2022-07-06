# coding:utf-8

import json
import os
import jieba
import jieba.analyse
from flask_cors import CORS
from wordcloud import WordCloud
from imageio import imread
import base64
from flask import Flask, render_template, request, jsonify
import numpy as np

from eval import get_title
from sql import User, Record, creat_app
from flask_sqlalchemy import SQLAlchemy

from text_analysis_tools import TfidfKeywords
from text_analysis_tools import TopicKeywords
from text_analysis_tools import TripleExtraction
from text_analysis_tools import TfidfSummarization

app = creat_app()
app.config['JSON_AS_ASCII'] = False

db = SQLAlchemy(app)

cors = CORS(app, resources={r"/getMsg": {"origins": "*"}})


@app.route('/')
def login():
    return render_template("login.html")


@app.route('/login_btn', methods=['GET', 'POST'])
def login_btn():
    if request.method == 'GET':
        try:
            for key in request.args.to_dict().keys():
                data = json.loads(key)
                account = data["account"]
                pwd = data["pwd"]
                user = db.session.query(User).filter(User.user_name == account, User.user_pwd == pwd).all()
                if len(user) == 0:
                    return jsonify({'msg': '用户不存在！'})
                else:
                    return jsonify({'msg': '登录成功！'})
            return jsonify({'msg': '登录成功！'}), 200
        except:
            return jsonify({'code': -1, 'msg': '登录异常！'}), 500
        finally:
            pass


@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template("register.html")


@app.route('/register_btn', methods=['GET', 'POST'])
def register_btn():
    if request.method == 'GET':
        try:
            for key in request.args.to_dict().keys():
                data = json.loads(key)
                name = data["name"]
                pwd = data["pwd"]
                mail = data["mail"]
                phone = data["phone"]
                user = db.session.query(User).filter(User.user_email == mail, User.user_telephone == phone).all()
                if len(user) == 0:
                    user = User(user_name=str(name), user_pwd=str(pwd), user_email=str(mail), user_telephone=str(phone))
                    db.session.add(user)
                    db.session.commit()
                    return jsonify({'msg': '注册成功！'}), 200
                else:
                    return jsonify({'msg': '用户已存在！'})
        except:
            return jsonify({'code': -1, 'msg': '注册失败！'}), 500
        finally:
            pass


@app.route('/forgetPwd', methods=['GET', 'POST'])
def forgetPwd():
    return render_template("forgetPwd.html")


@app.route('/forgetPwd_btn', methods=['GET', 'POST'])
def forgetPwd_btn():
    if request.method == 'GET':
        try:
            for key in request.args.to_dict().keys():
                data = json.loads(key)
                mail = data["mail"]
                phone = data["phone"]
                npwd = data["npwd"]
                user = db.session.query(User).filter(User.user_email == mail,
                                                     User.user_telephone == phone).all()
                if len(user) == 0:
                    return jsonify({'msg': '用户不存在或验证码错误！'})
                else:
                    user = User(user_name='zyx', user_pwd=str(npwd), user_email=str(mail), user_telephone=str(phone))
                    db.session.add(user)
                    db.session.commit()
                return jsonify({'msg': '修改密码成功！'}), 200
        except:
            return jsonify({'code': -1, 'msg': '修改异常！'}), 500
        finally:
            pass


# 接收txt文件
@app.route('/upload/file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        try:
            file = request.files['file']
            content = file.read().decode("utf-8")
            return jsonify({'data': content}), 200
        except:
            return jsonify({'code': -1, 'msg': '文件上传失败！'}), 500
        finally:
            pass


@app.route('/generate/rose', methods=["GET", "POST"])
def generate_rose(delete_stopwords=True, topK=8, withWeight=True):
    print(1)
    if request.method == 'POST':
        print(2)
        try:
            text = request.json.get("text")
            tfidf = TfidfKeywords(delete_stopwords=True, topK=8, withWeight=True)
            keywords = tfidf.keywords(text)
            data = []
            for i,j in enumerate(keywords):
                data.append({"value":j[1],"name":"{}".format(j[0])})
            print(data)
            return jsonify({"data": data})
        except:
            return jsonify({'code': -1, 'msg': '摘要生成失败!'}), 500
        finally:
            pass

# 词频统计
@app.route('/generate/freq', methods=["GET", "POST"])
def generate_freq(delete_stopwords=True, topK=20, withWeight=True):
    if request.method == 'POST':
        try:
            text = request.json.get("text")
            tfidf = TfidfKeywords(delete_stopwords=True, topK=20, withWeight=True)
            keywords = tfidf.keywords(text)
            return jsonify({"data": keywords})
        except:
            return jsonify({'code': -1, 'msg': '摘要生成失败!'}), 500
        finally:
            pass


# 主题抽取
@app.route('/generate/topic', methods=["GET", 'POST'])
def generate_topic(n_components=3, n_top_words=5, max_iter=10):
    if request.method == 'POST':
        text = str(request.json.get("text"))
        text = text.split('\n')
        topic_keywords = TopicKeywords(train_data=text, n_components=n_components,
                                       n_top_words=n_top_words, max_iter=max_iter)
        print(topic_keywords)
        keywords = topic_keywords.analysis()
        teams = {}
        nbTeam = 0
        for key, value in keywords.items():
            for i, j in enumerate(value):
                teams[nbTeam] = {"name": "{}".format(key),
                                "children": [
                                    {"name": "{}".format(j), "value": 200}]}
                nbTeam += 1
        children = []
        for i in teams:
            children.append(teams[i])
        j = {"name": "title", "children": children}
        file = open('./static/data/TreeData.json', 'w')
        file.write(json.dumps(j, indent=4))
        file.close()
        return jsonify({"topic keywords: {}\n".format(keywords)})


# 知识图谱
@app.route('/generate/triple', methods=["GET", 'POST'])
def generate_triple():
    if request.method == 'POST':
        try:
            text = request.json.get('text', None)
            extractor = TripleExtraction()
            res = extractor.triples_main(text)
            return jsonify({"data", res})
        except:
            return jsonify({'code': -1, 'msg': '知识图谱生成失败!'}), 500
        finally:
            pass


# 标题生成
@app.route('/generate/title', methods=["GET", 'POST'])
def generate_title():
    if request.method == 'POST':
        try:
            text = request.json.get("text")
            decoded_words = get_title(text)
            # decoded_words = "记对全国春季农业生"
            return jsonify({"data": decoded_words})
        except:
            return jsonify({'code': -1, 'msg': '标题生成失败!'}), 500
        finally:
            pass


# 摘要生成
@app.route('/generate/summary', methods=["GET", 'POST'])
def tfidf_summarization(ratio=0.2):
    if request.method == 'POST':
        try:
            text = request.json.get("text")
            summ = TfidfSummarization(ratio=ratio)
            summ = summ.analysis(text)
            return jsonify({"data": summ})
        except:
            return jsonify({'code': -1, 'msg': '摘要生成失败!'}), 500
        finally:
            pass


# 主界面
@app.route('/visual', methods=["GET", 'POST'])
def visual():
    return render_template('visual.html')


if __name__ == '__main__':
    app.run(debug=True)
