# encoding: utf-8
from werkzeug.security import check_password_hash
from flask import Flask
from flask_sqlalchemy import SQLAlchemy  # flask的一个数据库ORM（对象关系映射）库，封装了一系列对数据库的操作API
from flask_cors import *

# 为了兼容mysqldb，ImportError: No module named 'MySQLdb'
import pymysql

pymysql.install_as_MySQLdb()


def creat_app():  # 配置flask-sqlalchemy连接MySQL数据库
    app = Flask(__name__)  # 创建应用程序对象
    CORS(app, supports_credentials=True)  # 设置跨域
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:6978@127.0.0.1:3306/nlp"
    # 如果设置成 True (默认情况)，Flask-SQLAlchemy 将会追踪对象的修改并且发送信号。
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JSON_AS_ASCII"] = False
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    return app


# 绑定app至SQLAlchemy
app = creat_app()
db = SQLAlchemy(app)  # 创建数据库对象


# 定义数据表的model类User，以完成数据库表和数据对象之间的关系映射
class User(db.Model):
    __tablename__ = "UserInfo"
    user_id = db.Column(db.Integer, primary_key=True)  # 用户id，账号，主键
    user_name = db.Column(db.VARCHAR(20), nullable=False)  # 昵称非空
    user_pwd = db.Column(db.VARCHAR(30), nullable=False)  # 密码非空
    user_email = db.Column(db.VARCHAR(20), nullable=False)  # 邮箱非空
    user_telephone = db.Column(db.VARCHAR(15), nullable=False)  # 电话非空
    record_id = db.relationship('Record', backref='user_info')  # 一个用户对应多个记录id

    # 查询时的返回
    def __repr__(self):
        return "<User %r>" % self.user_id

    # 检查密码是否正确
    def check_pwd(self, pwd):
        return check_password_hash(self.user_pwd, pwd)


# 定义数据表的model类Record，以完成数据库表和用户使用记录之间的关系映射
class Record(db.Model):
    __tablename__ = "HistoryRecord"
    record_id = db.Column(db.Integer, primary_key=True)  # 记录id
    record_time = db.Column(db.DATETIME)  # 记录时间
    record_content = db.Column(db.TEXT)  # 记录文本
    user_id = db.Column(db.Integer, db.ForeignKey('UserInfo.user_id'))
    title = db.Column(db.TEXT)  # 标题生成记录
    summary = db.Column(db.TEXT)  # 摘要生成记录

    # 查询时的返回
    def __repr__(self):
        return "<Record %r>" % self.record_id

    def repr(self, HistoryRecord=None):
        if not HistoryRecord:
            return "error: HistoryRecord is None"
        res = []

        for item in HistoryRecord:
            res.append(
                {'record_id': item.record_id, 'record_time': item.record_time, 'record_content': item.record_content,
                 'title': item.title, 'summary': item.summary})
        return res


# 执行创建表语句
if __name__ == "__main__":
    db.drop_all()  # 删除存在的表
    db.create_all()  # 创建四个表

    # user1 = User(user_name='ltw', user_pwd='123', user_email='ltw@163.com', user_telephone='110')
    # user2 = User(user_name='sfz', user_pwd='456', user_email='sfz@163.com', user_telephone='220')
    # db.session.add_all([user1, user2])
    # db.session.commit()


    # record1 = Record(record_time='2022.7.1', record_content='第二条记录', user_id=user1.user_id,
    #                  title="标题一", summary="摘要一")
    # record2 = Record(record_time='2022.6.30', record_content='第二条记录', user_id=user1.user_id,
    #                  title="标题二", summary="摘要二")
    # db.session.add_all([record1, record2])
    # db.session.commit()
