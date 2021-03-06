import common


@common.hungry_singleton
class DbOperator:
    def __init__(self):
        self.db_helper = common.init_db()
        self.logger = common.init_logger("db_operator")

    def insert_user_info(self, phone, name=None, passwd=None):
        data = {"phone": phone, "name": name, "passwd": passwd}
        self.db_helper.insert("user_info", data)

    def select_user_info(self, phone=None):
        sql = "SELECT * FROM user_info WHERE 1=1"
        if phone is not None:
            sql += " AND phone='{}'".format(phone)
        rows = self.db_helper.query(sql)
        return rows

    def insert_history(self, data: dict):
        self.db_helper.insert("history", data)

    def select_history(self, phone=None):
        sql = "SELECT * FROM history WHERE 1=1"
        if phone is not None:
            sql += " AND phone='{}' ORDER BY insert_time asc".format(phone)
        rows = self.db_helper.query(sql)
        return rows

    def insert_image_history(self, data: dict):
        self.db_helper.insert("image_history", data)

    def select_image_history(self, job_id=None):
        sql = "SELECT * FROM image_history WHERE 1=1"
        if job_id is not None:
            sql += " AND job_id='{}'".format(job_id)
        rows = self.db_helper.query(sql)
        return rows
