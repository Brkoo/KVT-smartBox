from threading import Thread
import numpy as np
import cv2
import pickle
import os
import time
from PIL import Image

threadZakljucil=False	#True....thread je naredil nov trainer.yml in labels.pickle

def lbp(potDoSlike):
	slika=cv2.imread(potDoSlike)
	#poisci LBP po metodi https://miro.medium.com/max/1400/1*vBddGyANCoj4PYiKNptXnQ.png
	for y in range(1, slika.shape[0]-1):
		for x in range(1, slika.shape[1]-1):
			center=lbp[y,x]

			a1=slika[y-1,x-1]
			a2=slika[y,x-1]
			a3=slika[y+1,x-1]
			a4=slika[y+1,x]
			a5=slika[y+1,x+1]
			a6=slika[y,x+1]
			a7=slika[y-1,x+1]
			a8=slika[y-1,x]

			if(a1>center):
				a1=1
			else:
				a1=0

			if (a2 > center):
				a2 = 1
			else:
				a2 = 0

			if (a3 > center):
				a3 = 1
			else:
				a3 = 0

			if (a4 > center):
				a4 = 1
			else:
				a4 = 0

			if (a5 > center):
				a5 = 1
			else:
				a5 = 0

			if (a6 > center):
				a6 = 1
			else:
				a6 = 0

			if (a7 > center):
				a7 = 1
			else:
				a7 = 0

			if (a8 > center):
				a8 = 1
			else:
				a8 = 0

			a1*=128
			a2*=1
			a3*=2
			a4*=4
			a5*=8
			a6*=16
			a7*=32
			a8*=64

			#lbp[y,x] je center
			lbp[y, x]=a1+a2+a3+a4+a5+a6+a7+a8

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




treningThread = Thread(target=treniranje)
treningThread.start()
while True:
	if(threadZakljucil==True):
		break
	# pocakaj, da se naredijo prvi podatki ob zagoni skripte

face_cascade=cv2.CascadeClassifier('cascades/data/haarcascade_frontalface_alt2.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainer.yml")
labels={"person_name":1}
with open("labels.pickle", 'rb') as f:
	og_labels=pickle.load(f)
	labels={v:k for k,v in og_labels.items()}

while True:
	if(threadZakljucil==True):
		print("NALAGANJE NOVEGA trainer.yml")
		recognizer = cv2.face.LBPHFaceRecognizer_create()
		recognizer.read("trainer.yml")
		labels={"person_name":1}
		with open("labels.pickle", 'rb') as f:
			og_labels=pickle.load(f)
			labels={v:k for k,v in og_labels.items()}
		threadZakljucil=False
	

	print("PREPOZNAVA CAKA")
	recognitionFile = open('recognition.txt', 'a')
	vseSlike = os.listdir("images")
	time.sleep(0.5)
	for x in range(len(vseSlike)):
		potDoSlike="images/"
		potDoSlike+=vseSlike[x]
		print(potDoSlike)

		recognitionFile.write("\n")
		recognitionFile.write(vseSlike[x])
		#recognitionFile.write("\n")

		frame=cv2.imread(potDoSlike)
		#zaznaj obraz
		gray=cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces=face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=1)
		for(x,y,w,h) in faces:
			#print(x,y,w,h)
			roi_gray=gray[y:y+h, x:x+w]
			roi_color = frame[y:y + h, x:x + w]

			id_, conf=recognizer.predict(roi_gray)
			print(labels[id_], conf)

			recognitionFile.write("\n")
			recognitionFile.write(labels[id_])

			#narisi okvir
			color=(255,0,0)
			stroke=2
			width=x+w
			height=y+h
			cv2.rectangle(frame, (x,y), (width, height), color, stroke)

		#izbrisi datoteko
		os.remove(potDoSlike)