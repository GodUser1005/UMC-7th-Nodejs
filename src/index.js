//const express = require('express') // -> CommonJS
import dotenv from "dotenv";
import express from "express";        // -> ES Module
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { userSignUpController } from "./controllers/user.controller.js";
import { addStoreController } from "./controllers/store.controller.js";
import { addReviewController, getReviewsFromStoreController, getReviewsFromUserController } from "./controllers/review.controller.js";
import {
  addMissionController,
  tryMissionController,
  getMissionsFromStoreController,
  getMissionsFromUserController
} from "./controllers/mission.controller.js";


dotenv.config();  // .env 파일로 부터 환경변수를 읽고 이를 process.env 라는 객체를 통해 접근 허용

const app = express()
const port = process.env.PORT;

// 공통응답을 사용할 수 있는 헬퍼함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({resultType: "SUCCESS", error: null, success})
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null}) => {
    return res.json({
      resultType: "FAIL",
      error : {errorCode, reason, data},
      success: null
    });
  };

  next();
});

app.use(cors());  // cors 방식 허용?
app.use(express.static('public'));  // 정적 파일 접근?
app.use(express.json());  // request body를 json으로 해석할 수 있도록 함(JSON형태의 요청 body를 파싱)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/openapi.json", async(req,res,next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: false,
    writeOutputFile: false,
  };
  const outputFile = "dev/null";
  const routes = ["./src/index.js", "./src/controllers/review.controller.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트.",
    },
    host: "localhost:3000",
  };
  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get('/', (req, res) => {
  res.send("Hello World!");
});


/*
    #swagger.tags = ["User"]
    #swagger.summary = "회원 가입 API"
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    "type": "object",
                    "properties": {
                        "email": { type: "string" },
                        "name": { type: "string" },
                        "gender": { type: "integer" },
                        "birth": { type: "string", format: "date" },
                        "address": { type: "string" },
                        "food_categories": { type: "array", items: { type: "integer" } }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "회원 가입 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "object", nullable: true, example: null },
                        success: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                e_mail: { type: "string" },
                                gender : {type : "integer"},
                                birth : {type : "string", format : "date"},
                                address : {type : "string"},
                                preferCategory: { type: "array", items: { type: "string" } }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "회원 가입 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U001" },
                                reason: { type: "string" },
                                data: { 
                                    type: "object", 
                                    properties: {
                                        email: { type: "string" },
                                        name: { type: "string" },
                                        gender: { type: "integer" },
                                        birth: { type: "string", format: "date" },
                                        address: { type: "string" },
                                        food_categories: { type: "array", items: { type: "integer" } }
                                    }
                                }
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                } 
            }
        }
    }
*/
app.post("/api/v1/users", userSignUpController);

app.post("/api/v1/stores", addStoreController);
app.post("/api/v1/stores/:storeId/reviews", addReviewController);
app.post("/api/v1/stores/:storeId/missions", addMissionController);
app.post("/api/v1/users/:userId/missions/:missionId", tryMissionController);

app.get("/api/v1/stores/:storeId/reviews", getReviewsFromStoreController);
app.get("/api/v1/users/:userId/reviews", getReviewsFromUserController);
app.get("/api/v1/stores/:storeId/missions", getMissionsFromStoreController);
app.get("/api/v1/users/:userId/missions",getMissionsFromUserController);

// 전역 오류 처리를 위한 미들웨어
app.use((err, req, res, next) => {
  if(res.headersSent){
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });

  console.log(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

