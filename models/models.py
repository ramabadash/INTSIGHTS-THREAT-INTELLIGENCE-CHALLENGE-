# from xml.dom.minidom import Document
from mongoengine import Document, StringField
from pydantic import BaseModel

class Paste(Document):
    Title = StringField()
    Author = StringField()
    Content = StringField()
    Date = StringField()

class NewPate(BaseModel):
    Title : str
    Author : str
    Content : str
    Date : str