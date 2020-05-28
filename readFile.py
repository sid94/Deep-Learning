import sys
import os
import string
from collections import Counter
import pickle

def main1():
    message = []
    label = []
    
    datadir = "data"
    
    if(not os.path.isfile('message.pkl') and not os.path.isfile('label.pkl')):
        for dir_entry in os.listdir(datadir):
            dir_path =  os.path.join(datadir,dir_entry)
            for dir_1 in os.listdir(os.path.join(datadir,dir_entry)):
                dir_path1 =  os.path.join(dir_path,dir_1)
                for file in os.listdir(dir_path1):
                    filePath = os.path.join(dir_path1,file)
                    if os.path.isfile(filePath):
                        with open(filePath, 'r', encoding='ascii', errors="ignore") as textFile:
                            if(dir_1 == "ham"):
                                message.append(textFile.read())
                                label.append(0)
                            else:
                                message.append(textFile.read())
                                label.append(1)
                                
        with open('message.pkl', 'wb') as f:
            pickle.dump(message, f)
        
        with open('label.pkl', 'wb') as f:
            pickle.dump(label, f)
    else:
        with open('message.pkl', 'rb') as f:
            message = pickle.load(f)
        
        print("yes read from pickle")
        
        with open('label.pkl', 'rb') as f:
            label = pickle.load(f)
            
        print(len(label))
        print(len(message))
        
        
    
    
    
    
    
    
    
            
            
    


main1()