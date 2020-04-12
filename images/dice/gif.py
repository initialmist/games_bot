import imageio
from random import randint as rand
'''images = []
filenames = ['coin1.png','coin2.png']*10+['coin1.png']*25+['coin1wins.png']*15
for filename in filenames:
    images.append(imageio.imread(filename))
imageio.mimsave('Heads.gif', images)
'''
for i in range(1,7):
    filenames=[]
    images=[]
    for _ in range(25):
        x = rand(1,6)
        filenames.append(str(x)+'.png')
    filenames = filenames+[str(i)+'.png']*30
    for filename in filenames:
        images.append(imageio.imread(filename))
    imageio.mimsave(str(i)+'.gif', images)
    
    
