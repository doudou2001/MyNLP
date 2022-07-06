vocab_path = "data/vocab"

# Hyperparameters
hidden_dim = 512
emb_dim = 256
batch_size = 60
max_enc_steps = 100  # 99% of the articles are within length 55
max_dec_steps = 20  # 99% of the titles are within length 15
beam_size = 4
min_dec_steps = 3
vocab_size = 80000
demo_vocab_path = "vocab"
demo_vocab_size = 80000

lr = 0.002
rand_unif_init_mag = 0.02
trunc_norm_init_std = 1e-4

eps = 1e-12
max_iterations = 5000

model_path = "models/0000500.tar"

intra_encoder = True
intra_decoder = True

cuda = False
