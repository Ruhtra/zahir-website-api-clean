export interface IUseCase<RequestDto, ResponseDto> {
  execute(request: RequestDto): Promise<ResponseDto>;
}
