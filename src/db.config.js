import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient({log: ["query"]});

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    // Pool에 획득할 수 있는 connection이 없을 때
    // true면 요청을 대기 queue에 넣고 connection을 사용할 수 있게 되면
    // 요청을 실행 하며, false이면 즉시 오류 내보내고 다시 요청
    connectionLimit: 10,    // 몇 개의 커넥션을 가지게끔 할 것인지
    queueLimit: 0,  // getConnection에서 오류가 발생하기 전에 Pool에 대기할 요청의 개수 한도
});

