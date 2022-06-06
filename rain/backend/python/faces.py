from threading import Thread
import numpy as np
import cv2
import pickle
import os
import time
from PIL import Image

threadZakljucil=False	#True....thread je naredil nov trainer.yml in labels.pickle

def treniranje():
	stDirekorijev=0
	while True:
		print("TRENIRANJE CAKA")
		time.sleep(0.5)
		if(len(next(os.walk('training'))[1])>stDirekorijev):
			print("TRENIRANJE ...")
			stDirekorijev=len(next(os.walk('training'))[1])

			BASE_DIR=os.path.dirname(os.path.abspath(__file__)) #preisci vse slike v direktoriju "training"
			image_dir=os.path.join(BASE_DIR, "training")

			face_cascade=cv2.CascadeClassifier('cascades/data/haarcascade_frontalface_alt2.xml')
			recognizer=cv2.face.LBPHFaceRecognizer_create()

			current_id=0
			label_ids={}
			y_labels=[]
			x_train=[]

			for root, dirs, files in os.walk(image_dir):
				for file in files:
					if file.endswith("png") or file.endswith("jpg"):
						path=os.path.join(root,file)
						label=os.path.basename(os.path.dirname(path)) #label je ime mape, kjer je slike timotej/vanesa/karlo
						print(label, path)
						if not label in label_ids:
							label_ids[label]=current_id
							current_id+=1

						id_=label_ids[label]

						pil_image = Image.open(path).convert("L") #pretvori v crnobelo
						image_array=np.array(pil_image, "uint8") #pretvori sliko v numpy array
						faces=face_cascade.detectMultiScale(image_array)

						for(x,y,w,h) in faces:
							roi=image_array[y:y+h, x:x+w]
							x_train.append(roi)
							y_labels.append(id_)


			with open("labels.pickle", "wb") as f:
				pickle.dump(label_ids, f)

			recognizer.train(x_train, np.array(y_labels))
			recognizer.save("trainer.yml")

			global threadZakljucil
			threadZakljucil=True