export const questionsCodes = [
    "#include <stdio.h>\n#include <syscalls.h>\n\ntime getTime() {\n\treturn null;\n}\n\nint bootup_main() {\n\tint A = getTime(); \n\treturn useTimeToStartComputer(A);\n}",
    "int userPwd = USER_PASSWORD_PT\nint enteredPwd;\n\nscanf('%d', &enteredPwd);\n\nint compare() {\n\tint x = ((userPwd > enteredPwd) & (userPwd < enteredPwd));\n\tint y = (userPwd || enteredPwd);\n\treturn x & y;\n}",
    "#include <stdio.h>\n\ndouble sin(double x, int b) {\n\n\tint fact_iter(int n) {\n\t\tif (n == 0) {\n\t\t\treturn 1;\n\t\t}\n\t\tint c = 0;\n\t\tint f = 1;\n\t\twhile (c < n) {\n\t\t\tf = f * (c + 1);\n\t\t\tc = c + 1;\n\t\t}\n\t\treturn f;\n\t}\n\n\tdouble fastpower(double x, int n) {\n\t\tint p = n;\n\t\tdouble t = 1;\n\t\tif (n == 0) {\n\t\t\treturn 1;\n\t\t}\n\t\telse {\n\t\t\twhile (p > 0) {\n\t\t\t\tif (p % 2 == 0) {\n\t\t\t\t\tx = x * x;\n\t\t\t\t\tp = p / 2;\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tt = t * x;\n\t\t\t\t\tp = p - 1;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn t;\n\t\t}\n\t}\n\n\tdouble pi = acos(-1);\n\tx = fmod(x, 2 * pi);\n\n\tint c = 0;\n\tdouble sin_sum = 0;\n\twhile (c <= b) {\n\t\tsin_sum = sin_sum + (fastpower(-1, c) / fact_iter(2 * c + 1)) * fastpower(x, 2 * c + 1);\n\t\tc = c + 1;\n\t}\n\treturn sin_sum;\n}\n\nint main() {\n\tprintf('%f\n', sin(10000000, 1000000000000));\n\treturn 0;\n}",
    "#include <stdio.h>\n#include <math.h>\n  \nconst double up = 19.0 + (61.0/125.0);\nconst double down = -32.0 - (2.0/3.0);\ndouble rectangle = (up - down) * 8.0;\n \ndouble f(double x) {\n\treturn (pow(x, 4.0)/500.0) - (pow(x, 2.0)/200.0) - 0.012;\n}\n \ndouble g(double x) {\n\treturn -(pow(x, 3.0)/30.0) + (x/20.0) + (1.0/6.0);\n}\n \ndouble area_upper(double x, double step) {\n\treturn (((up - f(x)) + (up - f(x + step))) * step) / 2.0;\n}\n \ndouble area_lower(double x, double step) {\n\treturn (((g(x) - down) + (g(x + step) - down)) * step) / 2.0;\n}\n \ndouble area(double x, double step) {\n\treturn area_upper(x, step) + area_lower(x, step);\n}\n \nint main() {\n\tdouble current = 0, last = 0, step = 1.0;\n \n\tdo {\n\t\tlast = current;\n\t\tstep /= 10.0;\n\t\tcurrent = 0\n \n\t\tfor(double x = 2.0; x < 10.0; x += step) current += area(x, step);\n \n\t\tcurrent = rectangle - current;\n\t\tcurrent = round(current * 1000.0) / 1000.0;\n\t\tstd::cout << current << std::endl;\n\t} while(current != last);\n \n\tprintf('%d', current);\n\treturn 0;\n}"
]

export const questionsText = [
    {
        problem: "Seems like this code isn't working. When a computer is booting up, it needs to know the time to set the clock. To get the computer started, find what's preventing this code from running, and fix it.",
        hint: "There is syscall called time(), that returns the current time in UTC format, maybe thats missing here somewhere."
    },
    {
        problem: "The OS is trying to verify your password through a weird logic condition. You know that the password is a number, so you can use that to your advantage. Find the bug and fix it.",
        hint: "How does C compare numbers? Maybe you really only need to edit one line of code."
    },
    {
        problem: "Fast power is a function that takes in a number and a power, and returns the number raised to the power. For example, fastpower(2, 3) would return 8. The function is supposed to be fast, but it's not working. Find the bug and fix it.",
        hint: "Googol might be your friend or your worst enemy here."
    },
    {
        problem: "I think the developer who wrote this code probably forgot what he was tring to do. A little mish-mash of somethings has resulted in this broken code.",
        hint: "What if I started speaking french in the middle of an english sentence? The room outside might help you."
    },
]

export const solutions = [
    "printf('Hello World');",
]