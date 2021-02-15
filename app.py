from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbtodo

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/api/addTodo', methods=['POST'])
def make_todo():
   todo_receive = request.form['todo_give']

   doc = {'todo': todo_receive}
   db.todo.insert_one(doc)
   return jsonify({'msg': '저장 완료!'})

@app.route('/api/addTodo', methods=['GET'])
def get_todo():

   todos = list(db.todo.find({}, {'_id': False}))

   return jsonify({'all_todos': todos})

@app.route('/api/delete', methods=['POST'])
def del_todo():
   todo_receive = request.form.get('todo_give', False)

   db.todo.delete_one({'todo': todo_receive})

   return jsonify({'msg': '삭제 완료'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)