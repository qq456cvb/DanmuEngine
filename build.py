import os
import os.path

outPath = './out/output.js'
if not os.path.exists("./out"):
    os.makedirs("./out")
outfile = open(outPath, 'w+')
for root, dirs, files in os.walk("./DanmuEngine"):
	for name in files:
		fname = os.path.join(root, name)
		if fname.endswith(".js"):
			with open(fname) as infile:
				outfile.write(infile.read())

# write user files
for root, dirs, files in os.walk("./src"):
	for name in files:
		fname = os.path.join(root, name)
		if fname.endswith(".js"):
			with open(fname) as infile:
				outfile.write(infile.read())

outfile.close()
print "Done.\nFile written to " + os.path.abspath(outPath)