export const questionsCodes = [
    "#include <syscalls.h>\n\nclass getUTCTime {\npublic:\n\tT(){}\n\tint getTime() const;\n\nprivate:\n\tint n_t;\n};\n\nint i = T().getTime();"
]

export const questionsText = [
    {
        problem: "Seems like this code isn't working. When a computer is booting up, it needs to know the time to set the clock. To get the computer started, find what's preventing this code from running, and fix it.",
        hint: "There is syscall called time(), that returns the current time in UTC format, maybe thats missing here somewhere."
    },
    {
        problem: "Seems like this code isn't working. When a computer is booting up, it needs to know the time to set the clock. To get the computer started, find what's preventing this code from running, and fix it.",
        hint: "There is syscall called time(), that returns the current time in UTC format, maybe thats missing here somewhere."
    }
]

export const solutions = [
    "printf('Hello World');",
]