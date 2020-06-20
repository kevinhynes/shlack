import os

# Function to rename multiple files
def main():

	for count, filename in enumerate(os.listdir("images")):
		new_name = "monster-" + str(count) + ".svg"
		os.rename("images/" + filename, "images/" + new_name)


# Driver Code
if __name__ == '__main__':

    # Calling main() function
    main()
