
export default {
    Query: {
        hello: (_: any, __: any, { req }: any) => {
            // console.log(req);
            const token = req.headers.authorization || '';
            console.log({ token })
            return 'Hello World';
        }
    }
}