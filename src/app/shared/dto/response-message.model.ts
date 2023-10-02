export class ResponseMessage<Result>{
    public hasError: boolean = false;
    public errorCode: string = '';
    public errorMessage: string = '';
    public result: Result | undefined;
}