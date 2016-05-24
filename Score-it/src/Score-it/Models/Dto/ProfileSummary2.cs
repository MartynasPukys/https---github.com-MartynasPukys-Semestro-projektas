using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Score_it.Models.Dto
{
    public class ProfileSummary2
    {
        public int level { get; set; }
        public string name { get; set; }
        public string rank { get; set; }
        public int wins { get; set; }
        public int losses { get; set; }
        public string progress { get; set; }
        public int id { get; set; }
        public string userId { get; set; }
    }
}
