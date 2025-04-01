namespace Domain.Enums;

public enum CategoryType
{
    None = -1,
    Work = 0,
    School = 1,
    Personal = 2
}

public static class CategoryTypeExtensions{
    public static string ToString(this CategoryType categoryType)
    {
        switch (categoryType)
        {
            default: return "";

            case CategoryType.Work: return "work";

            case CategoryType.School: return "school";

            case CategoryType.Personal: return "personal";
        }
    }

    public static CategoryType ToCategoryType(this string categoryName)
    {
        switch (categoryName.ToLower())
        {
            default: return CategoryType.None;

            case "work": return CategoryType.Work;

            case "school": return CategoryType.School;

            case "personal": return CategoryType.Personal;
        }
    }
}