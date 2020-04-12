import imageio
images = []
filenames = ['coin1.jpg','coin2.jpg']*10+['coin1.jpg']*15+['coin1wins.png']*15
for filename in filenames:
    images.append(imageio.imread(filename))
    images.append(imageio.imread(filename))
imageio.mimsave('Heads.gif', images)

images = []
filenames = ['coin1.jpg','coin2.jpg']*10+['coin2.jpg']*15+['coin2wins.png']*15
for filename in filenames:
    images.append(imageio.imread(filename))
    images.append(imageio.imread(filename))
imageio.mimsave('Tails.gif', images)