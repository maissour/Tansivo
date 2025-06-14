namespace Presentation.Helpers
{
    public class UploadedImage
    {
        public string Upload(IFormFile file, string categoryName, string userEmail)
        {
            List<string> validExtentions = new List<string>()
            {
                ".jpg", ".png", ".jpeg", ".gif"
            };
            string extention = Path.GetExtension(file.FileName);
            if (!validExtentions.Contains(extention))
            {
                return $"Error,invalid extention (should be {string.Join(',', validExtentions)})";
            }

            long size = file.Length;
            if (size > (10 * 1024 * 1024))
            {
                return "Error,Max size is 10MB";
            }

            string fileName = Guid.NewGuid().ToString() + extention;
            string userPath = Path.Combine(Directory.GetCurrentDirectory(), Path.Combine("Images", userEmail));
            if (!Directory.Exists(userPath))
            {
                Directory.CreateDirectory(userPath);
            }
            string path = Path.Combine(userPath, categoryName);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            using FileStream stream = new FileStream(Path.Combine(path , fileName), FileMode.Create);
            file.CopyTo(stream);
            string returnPath = userEmail + "/" + categoryName + "/" + fileName;
            return returnPath;
        }
    }
}
