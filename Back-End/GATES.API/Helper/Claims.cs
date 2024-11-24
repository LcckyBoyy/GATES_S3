using System.Security.Claims;

namespace GATES.API.Helper
{
	public static class Claims
	{
		public static string Id(this ClaimsPrincipal claim)
		{
			if (claim == null || claim.Identity == null || !claim.Identity.IsAuthenticated) return "";

			ClaimsPrincipal currentUser = claim;
			var name = currentUser.FindFirstValue(ClaimTypes.NameIdentifier);
			return name ?? "";
		}

		public static string Name(this ClaimsPrincipal claim)
		{
			if (claim == null || claim.Identity == null || !claim.Identity.IsAuthenticated) return "";

			ClaimsPrincipal currentUser = claim;
			var name = currentUser.FindFirstValue(ClaimTypes.Name);
			return name ?? "";
		}

		public static string? Email(this ClaimsPrincipal claim)
		{
			if (claim == null || claim.Identity == null || !claim.Identity.IsAuthenticated) return "";

			var email = claim.FindFirstValue(ClaimTypes.Email);
			return email ?? "";
		}
	}
}
