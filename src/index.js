//const express = require('express') // -> CommonJS
import dotenv from "dotenv";
import express from "express";        // -> ES Module
import cors from "cors";

import { userSignUpController } from "./controllers/user.controller.js";
import { addStoreController } from "./controllers/store.controller.js";
import { addReviewController, getReviewsFromStoreController, getReviewsFromUserController } from "./controllers/review.controller.js";
import {
  addMissionController,
  tryMissionController,
  getMissionsFromStoreController
} from "./controllers/mission.controller.js";


dotenv.config();  // .env 파일로 부터 환경변수를 읽고 이를 process.env 라는 객체를 통해 접근 허용

const app = express()
const port = process.env.PORT;

app.use(cors());  // cors 방식 허용?
app.use(express.static('public'));  // 정적 파일 접근?
app.use(express.json());  // request body를 json으로 해석할 수 있도록 함(JSON형태의 요청 body를 파싱)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users", userSignUpController);
app.post("/api/v1/stores", addStoreController);
app.post("/api/v1/stores/:storeId/reviews", addReviewController);
app.post("/api/v1/stores/:storeId/missions", addMissionController);
app.post("/api/v1/users/:userId/missions/:missionId", tryMissionController);

app.get("/api/v1/stores/:storeId/reviews", getReviewsFromStoreController);
app.get("/api/v1/users/:userId/reviews", getReviewsFromUserController);
app.get("/api/v1/stores/:storeId/missions", getMissionsFromStoreController);

app.use((err, req, res, next) => {
  console.log(err);
  res.json({message:err.message});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

