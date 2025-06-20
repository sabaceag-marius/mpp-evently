﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Services.DTOs.Event;

public class FilterEventRequest
{
    public List<Guid>? categoryIds { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public required int PageNumber { get; set; }
    public required int PageSize { get; set; }
    public required bool FetchAllEvents { get; set; }
}

public class FilterEventCountRequest
{
    public List<string>? categoriesList { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
}

