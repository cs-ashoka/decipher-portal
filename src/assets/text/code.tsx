export const questionsCodes = [
  '#include <stdio.h>\n#include <syscalls.h>\n\ntime getTime() {\n\treturn null;\n}\n\nint bootup_main() {\n\tint A = getTime(); \n\treturn useTimeToStartComputer(A);\n}',
  "int userPwd = USER_PASSWORD_PT\nint enteredPwd;\n\nscanf('%d', &enteredPwd);\n\nint compare() {\n\tint x = ((userPwd > enteredPwd) & (userPwd < enteredPwd));\n\tint y = (userPwd || enteredPwd);\n\treturn x & y;\n}",
  "#include <stdio.h>\n\ndouble sin(double x, int b) {\n\n\tint fact_iter(int n) {\n\t\tif (n == 0) {\n\t\t\treturn 1;\n\t\t}\n\t\tint c = 0;\n\t\tint f = 1;\n\t\twhile (c < n) {\n\t\t\tf = f * (c + 1);\n\t\t\tc = c + 1;\n\t\t}\n\t\treturn f;\n\t}\n\n\tdouble fastpower(double x, int n) {\n\t\tint p = n;\n\t\tdouble t = 1;\n\t\tif (n == 0) {\n\t\t\treturn 1;\n\t\t}\n\t\telse {\n\t\t\twhile (p > 0) {\n\t\t\t\tif (p % 2 == 0) {\n\t\t\t\t\tx = x * x;\n\t\t\t\t\tp = p / 2;\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tt = t * x;\n\t\t\t\t\tp = p - 1;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn t;\n\t\t}\n\t}\n\n\tdouble pi = acos(-1);\n\tx = fmod(x, 2 * pi);\n\n\tint c = 0;\n\tdouble sin_sum = 0;\n\twhile (c <= b) {\n\t\tsin_sum = sin_sum + (fastpower(-1, c) / fact_iter(2 * c + 1)) * fastpower(x, 2 * c + 1);\n\t\tc = c + 1;\n\t}\n\treturn sin_sum;\n}\n\nint main() {\n\tprintf('%f\n', sin(10000000, 1000000000000));\n\treturn 0;\n}",
  "#include <stdio.h>\n#include <math.h>\n  \nconst double up = 19.0 + (61.0/125.0);\nconst double down = -32.0 - (2.0/3.0);\ndouble rectangle = (up - down) * 8.0;\n \ndouble f(double x) {\n\treturn (pow(x, 4.0)/500.0) - (pow(x, 2.0)/200.0) - 0.012;\n}\n \ndouble g(double x) {\n\treturn -(pow(x, 3.0)/30.0) + (x/20.0) + (1.0/6.0);\n}\n \ndouble area_upper(double x, double step) {\n\treturn (((up - f(x)) + (up - f(x + step))) * step) / 2.0;\n}\n \ndouble area_lower(double x, double step) {\n\treturn (((g(x) - down) + (g(x + step) - down)) * step) / 2.0;\n}\n \ndouble area(double x, double step) {\n\treturn area_upper(x, step) + area_lower(x, step);\n}\n \nint main() {\n\tdouble current = 0, last = 0, step = 1.0;\n \n\tdo {\n\t\tlast = current;\n\t\tstep /= 10.0;\n\t\tcurrent = 0\n \n\t\tfor(double x = 2.0; x < 10.0; x += step) current += area(x, step);\n \n\t\tcurrent = rectangle - current;\n\t\tcurrent = round(current * 1000.0) / 1000.0;\n\t\tstd::cout << current << std::endl;\n\t} while(current != last);\n \n\tprintf('%d', current);\n\treturn 0;\n}",
];

export const questionsText = [
  {
    problem: `You are the manager of McDonald's Delhi. You have been tasked with the protection of a top secret recipe for an upcoming Valentine's Day meal which is set to be inaugurated only on the 14th of February 2024. This recipe is kept in a foolproof safe in the MCD headquarters in Delhi. 
You have been given the encryption key (11*13,17) for the safe, but the safe uses letters for its lock. To prepare for the event, your branch employees are required to access the recipe. You tell your employees the secret word BORGIR. On reaching the safe, they are supposed to tell the guard the decryption key along with the word and encryption key to prove they are MCD employees.
They report back to you on the day of the event and tell you it has been a huge success. What do you think they told the guard?`,
    // hint: 'There is syscall called time(), that returns the current time in UTC format, maybe thats missing here somewhere.',
  },
  {
    problem: `Given the clues: grids 'n' pairs + "worms" + i=j;
Decrypt the following: womsmooowsmomrwwmowsmsrrorwswwrwmmorsmwwrrwmmmormowswswmrsmoomrrmmwsmomrwrwwmsmrwsrrwwrrrmrsrwwwmrmmomwrrsrmrwrwmsmmomrmrr`,
    // hint: 'How does C compare numbers? Maybe you really only need to edit one line of code.',
  },
  {
    problem: `You're a Burger King employee. Your boss is a weirdo who likes to call himself the Burger King, is insanely obsessed with the Roman Empire (actually reasonable) and cryptography. He tells all the employees that he has finalised the name of the employee receiving a promotion to kitchen manager, and that this person's name is in the safe in his office. If no one cracks it open, this person shall be promoted. However, in a test of his employees' smarts, he says that whoever cracks the safe before the given time, shall be promoted instead of the person on the safe-sheet. You, being a sprightly young buck, decide to go out and earn this promotion for yourself. You use your rich friend's 3D printer to make yourself a lockpick, and break into your boss' office in the dead of the night. Here, after rummaging through his drawers, the only related thing you find is a sheet saying:
"safe key: xrfwy, 5"
The safe only takes numbers as the passkey. What is the passkey?`,
    hint: 'Roman empire and king',
  },
  {
    problem: `A Wendy’s outlet sells two types of condiments: 'MagicMayo' and 'SpicyMayo’'. 'MagicMayo' sachets sell in two sizes; the marginal value of the first size is at Rs.10 and the marginal value of the second size is Rs.5. 'SpicyMayo’ sachets sell at at most one type of size,which has a marginal value of Rs.7. There are 50 identical 'MagicMayo' and 100 identical 'SpicyMayo' sachets. Cost of production is Rs.3 per sachet. Suppose that the outlet manager can NOT distinguish between a 'MagicMayo' and a 'SpicyMayo' sachet because of bad eyesight. She, however, decided to adopt the following scheme. If a customer purchases two sachets, then the sachets are priced at P2, whereas if a customer purchases one sachet, they pay P1. What are the profit maximizing prices? (put a space between them while answering)`,
    // hint: 'What if I started speaking french in the middle of an english sentence? The room outside might help you.',
  },
  {
    problem: `If A is aaaaa, D is aaacb, and X is fadcb, decrypt: aaaabaedcafaaabaadcaaeaaafaaab`,
  },
  // {
  //   pro
  // }
];

export const solutions = ["printf('Hello World');"];
