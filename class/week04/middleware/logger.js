// middlelware
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const logger = (req, rest, next) => {
    console.log(req.url);
    console.log(req.method);
//    console.log(req.headers);
    console.log(Date());
    next();
}

export default logger;