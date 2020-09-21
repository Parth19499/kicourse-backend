set NODE_ENV=%1
set COURSE_NODE_PORT=3001
set COURSE_NODE_JWT_PRIVATE_KEY=M!ySecret
IF %1==production (
    set PORT=3001
    set COURSE_DB_URL=mongodb+srv://admin-vector:iamvector@cluster0.qvci6.mongodb.net/mongoPrctice_prod?retryWrites=true^&w=majority
) ELSE (
    set COURSE_DB_URL=
)
pause