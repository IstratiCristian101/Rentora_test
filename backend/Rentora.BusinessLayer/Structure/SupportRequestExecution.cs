namespace Rentora.BusinessLayer.Structure;

using Rentora.BusinessLayer.Core;
using Rentora.BusinessLayer.Interfaces;
using Rentora.Domain.Models.SupportRequest;
using Rentora.Domain.Models.Responses;

public class SupportRequestExecution : SupportRequestActions, ISupportRequestAction
{
    public ActionResponse Create(SupportRequestCreateDto data)
        => CreateExecution(data);

    public List<SupportRequestDto> GetAll()
        => GetAllExecution();

    public SupportRequestDto? GetById(int id)
        => GetByIdExecution(id);

    public ActionResponse Delete(int id)
        => DeleteExecution(id);

    public ActionResponse UpdateStatus(int id, string status)
        => UpdateStatusExecution(id, status);
}