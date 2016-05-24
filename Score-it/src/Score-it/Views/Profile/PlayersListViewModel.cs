using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Score_it.Views.Profile
{
    public class PlayersListViewModel
    {
        public string search { get; set; }
        public int[] selectedPlayersIds { get; set; }
    }
}
