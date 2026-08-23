// 17. Write a singleton Logger class that logs messages to console.

// Khởi tạo class Logger kiểu singleton
class Logger {
    private static instance: Logger | null = null;
    private constructor() {}

    // Method static đảm bảo chỉ tạo 1 instance
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
          }
          return Logger.instance;
    }

    public log(content: string): void {
        console.log(content)
    }
}

const logInstance1 = Logger.getInstance()
const logInstance2 = Logger.getInstance()
logInstance1.log("instance1")
logInstance2.log("instance2")

console.log("log1 === log2: ", logInstance1 === logInstance2)