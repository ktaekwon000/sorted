# Use torchMoji to retrieve emoji most associated with the text.

from __future__ import print_function, division, unicode_literals
import json
import numpy as np

from torchmoji.sentence_tokenizer import SentenceTokenizer
from torchmoji.model_def import torchmoji_emojis
from torchmoji.global_variables import PRETRAINED_PATH, VOCAB_PATH

def textToEmoji(request):
  """HTTP Cloud function.
  Args: 
    request (flask.Request): The request object.
    <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
  Returns:
    The response text, or any set of values that can be turned into a
    Response object using `make_response`
    <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.
  """
  # Debugging
  if True:
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'text' in request_json:
      txt = request_json['text']
    elif request_args and 'text' in request_args:
      txt = request_args['text']
    else:
      txt = None

  def top_elements(array, k):
    ind = np.argpartition(array, -k)[-k:]
    return ind[np.argsort(array[ind])][::-1]
  
  maxlen = 1000
  with open(VOCAB_PATH, 'r') as f:
    vocabulary = json.load(f)
  st = SentenceTokenizer(vocabulary, maxlen)
  
  model = torchmoji_emojis(PRETRAINED_PATH)
  tokenized, _, _ = st.tokenize_sentences([txt])
  prob = model(tokenized)

  result = {"text": txt}
  t_prob=prob[0]
  ind_top = top_elements(t_prob, 5).tolist()
  for i in range(5):
    key = "emoji" + str(i)
    result.update({key: ind_top[i]})
  
  print(result)
  return result