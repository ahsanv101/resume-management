from django.shortcuts import render, redirect
import PyPDF2
import requests
import json
import sys
import spacy
import pickle
import random

nlp_model=spacy.load('./main/resumesys/nlp_model')
arr=[]
dic={}
fFileObj=open('./main/resumesys/Alice Clark CV.pdf','rb')
pdfreader=PyPDF2.PdfFileReader(fFileObj)
pageObj=pdfreader.getPage(0)
resume=str(pageObj.extractText())
tx=" ".join(resume.split("\n"))
doc=nlp_model(tx)

for ent in doc.ents:
    dic[ent.label_.upper()]=ent.text
    arr.append(ent.label_.upper()+' : '+ent.text)

#print(dic)

   
# Create your views here.
def homepage(request):

    return render(request=request,
                  template_name='main/resume.html',
                    context={"arr": arr})
