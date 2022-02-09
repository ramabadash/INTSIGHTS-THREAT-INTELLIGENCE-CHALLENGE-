# ----- DB -----#
from database.db import DB
DB.connection()

# ----- Helper func ----- #
def search_title_by_regex(regex): 
    return DB.Collection.count_documents( { "Title" : { '$regex' : regex, '$options' : 'i' } }) # Case-insensitive


# ----- Analyzer class ----- #
class Analyzer:
    Collection = DB.Collection

    # Get number of pastes
    def get_number_of_pastes():
        """
        :return: total number of pastes in db
        """
        return Analyzer.Collection.count_documents({})

    # Get pastes number pre author
    def get_authors_analysis():
        """
        :return: list with authors as keys and number of posts as value
        """
        return list(Analyzer.Collection.aggregate([
            {"$group": { "_id": "$Author",
                "Total": { "$sum": 1 } } }
        ]))

    # Get common dark words - times per word
    def get_common_words():
        """
        :return: list with authors as keys and number of posts as value
        """
        analytics_obj = { 
            "total_pastes_bitcoin": search_title_by_regex("bitcoin"),
            "total_pastes_porn": search_title_by_regex("porn"),
            "total_pastes_gun": search_title_by_regex("gun"),
            "total_pastes_creditcard": search_title_by_regex("creditcard"),
            "total_pastes_onion": search_title_by_regex("onion"),
            "total_pastes_drug": search_title_by_regex("drug"),
            "total_pastes_hack": search_title_by_regex("hack"),
            "total_pastes_leak": search_title_by_regex("leak"),
            "total_pastes_child": search_title_by_regex("child"),
            "total_pastes_dark": search_title_by_regex("dark"),
        }
        return analytics_obj

    # def get_dates_analysis():
    #     """
    #     :return: list with authors as keys and number of posts as value
    #     """
    #     return list(Analyzer.Collection.aggregate([
    #         {"$group": { "_id" : {"$dateToString": { "format": "%Y %m %d, %H:%M:%S", "date": "$split : [$Date , ',']"}},
    #             "Total": { "$sum": 1 } } }
    #     ]))



