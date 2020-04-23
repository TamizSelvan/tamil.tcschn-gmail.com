using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IO;

namespace ConsoleApp1
{
    class Program
    {

       static Byte[] keyAndIvBytes = UTF8Encoding.UTF8.GetBytes("tR7nR6wZHGjYMCuV");
       static  RijndaelManaged algorithm = new RijndaelManaged
        {
            Padding = PaddingMode.PKCS7,
            Mode = CipherMode.CBC,
            KeySize = 128,
            BlockSize = 128
        };

        static void Main(string[] args)
        {
            string user = "gius";
            string pwd = "landshark";

            string EncryptedUser =Encrypt(user);
            Console.WriteLine(EncryptedUser);
            Console.WriteLine(Decrypt(EncryptedUser));

            string EncryptedPassword = Encrypt(pwd);
            Console.WriteLine(EncryptedPassword);
            Console.WriteLine(Decrypt(EncryptedPassword));

        }

        public static string Decrypt(string EncryptedText)
        {
            Byte[] outputBytes = Enumerable.Range(0, EncryptedText.Length)
                                 .Where(x => x % 2 == 0)
                                 .Select(x => Convert.ToByte(EncryptedText.Substring(x, 2), 16))
                                 .ToArray();

            string plaintext = string.Empty;
           

            using (MemoryStream memoryStream = new MemoryStream(outputBytes))
            {
                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, algorithm.CreateDecryptor(keyAndIvBytes, keyAndIvBytes), CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(cryptoStream))
                    {
                        plaintext = srDecrypt.ReadToEnd();
                    }
                }
            }

            return plaintext;
        }

        public static string Encrypt(string inputText)
        {
            byte[] inputBytes = UTF8Encoding.UTF8.GetBytes(inputText);
            byte[] result = null;

            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, algorithm.CreateEncryptor(keyAndIvBytes, keyAndIvBytes), CryptoStreamMode.Write))
                {
                    cryptoStream.Write(inputBytes, 0, inputBytes.Length);
                    cryptoStream.FlushFinalBlock();

                    result = memoryStream.ToArray();
                }
            }

            return BitConverter.ToString(result).Replace("-", "");
        }

        
    }
}
