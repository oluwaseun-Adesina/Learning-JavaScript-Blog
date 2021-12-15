
print("Welcome to Group 1 program menue")
print("1. Calculator")
print("2. Print a String")
choice =int(input("Enter you choice: "))


repitition = 100
while repitition !=0:
    if choice == 1:
        operator = input("Enter + for addition, - for subtraction * for multiplication and / for division")
        num1 = int(input("enter the first number"))
        num2 = int(input("enter the second number"))
        if operator == '+':
            addition = num1 + num2 
            print(addition)
        elif operator == '-':
            subtraction = num1 - num2
            print(subtraction)
        elif operator == '*':
            multiplication = num2 * num2
            print(multiplication)
        elif operator == '/':
            division = num1 / num2
            print(division)
        else:
            print('invalid operator')
    elif choice ==2:
        name = input("Enter your name: ")
        print("Welcome to CSC 447 Group one program " + name)
    repitition = int(input("which of our program do you want to run 1 for calculator, 2 to print a string and 0 to exit: "))
    choice = repitition
    repitition -=1
    if choice ==0:
        break

