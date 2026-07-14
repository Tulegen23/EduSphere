import {Router} from "express"

import {
    teacherLogin,
    teacherLogout,
    refreshAccessToken,
    changeCurrentPassword,
    assignGrades,
    markAttendance,
    checkNotices,
    checkStudentByClass,
} from "../controllers/teacher.controller.js"

import {verifyJWT} from "../middlewares/teacherAuth.middleware.js";

const router = Router()

// BASIC
router.route('/login').post(teacherLogin)
router.route('/logout').post(verifyJWT,teacherLogout)
router.route('/refreshToken').post(verifyJWT, refreshAccessToken)
router.route('/changePassword').post(verifyJWT, changeCurrentPassword)

// STUDENTS
router.route('/assignGrades').post(verifyJWT, assignGrades)
router.route('/markAttendance').post(verifyJWT, markAttendance)

// FETCHING
router.route('/viewNotice/:teacherId').get(verifyJWT, checkNotices)

router.route("/checkStudentByClass/:classId").get(verifyJWT, checkStudentByClass); // Add this

export default router