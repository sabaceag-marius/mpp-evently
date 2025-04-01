using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.Event;

public class FilterEventRequest
{
    public required List<string> categoriesList { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public required int PageNumber { get; set; }
    public required int PageSize { get; set; }
}

