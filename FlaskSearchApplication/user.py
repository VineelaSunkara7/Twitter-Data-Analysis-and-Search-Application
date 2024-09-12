import mysql.connector as msql

from utils import make_dict, make_dict_list, make_user_dict_list

sql_password = "Knarra@8970"

def getUserByWord(word):
    conn = msql.connect(host='localhost', database='twitter', user='root', password='Knarra@8970')
    cursor = conn.cursor()
    query = f"SELECT * FROM users_data WHERE name LIKE '%{word}%' or screen_name LIKE '%{word}%';"
    cursor.execute(query)
    a=cursor.fetchall()
    cursor.close()
    conn.close()
    return make_dict_list(a)

def getUserByID(id):
    conn = msql.connect(host='localhost', database='twitter', user='root', password='Knarra@8970')
    cursor = conn.cursor()
    query = f"SELECT * FROM users_data WHERE id = '{id}';"
    cursor.execute(query)
    a=cursor.fetchall()
    cursor.close()
    conn.close()
    print(a)
    return make_dict(a[0]) if len(a)>0 else {}

def get_top_users():
    conn = msql.connect(host='localhost', database='twitter', user='root', password='Knarra@8970')
    cursor = conn.cursor()
    query = f"SELECT name, followers_count FROM users_data ORDER BY followers_count DESC LIMIT 10 ;"
    cursor.execute(query)
    a=cursor.fetchall()
    cursor.close()
    return make_user_dict_list(a)