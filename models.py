# from xml.dom.minidom import Document
from mongoengine import Document, StringField

class Paste(Document):
    Title = StringField()
    Author = StringField()
    Content = StringField()
    Date = StringField()