// import { supabase } from '/Users/dylanmolina/codeprojects/flywheels/lib/supabaseClient.js';
import { supabase } from '../../lib/supabaseClient';
import { useEffect, useState } from 'react';

const Home = () => {
    const [fetchError, setFetchError ] = useState(null);
    const [leaderboard, setLeaderboard ] = useState(null);

    useEffect(() => {
      const fetchLeaderboard = async () => {
          const { data, error } = await supabase
          .from('leaderboard')
          .select()
          .order('score', { ascending: false });

          if (error) {
              setFetchError("Could not fetch leaderboard");
              setLeaderboard(null);
              console.log("Could not fetch leaderboard because", error);
          }

          if (data) {
              setLeaderboard(data);
              setFetchError(null);
          }
      }

      fetchLeaderboard();

    }, [])

    return (
        <div>
        {fetchError && (<p>{fetchError}</p>)}
        {leaderboard && (
            <div>
                {leaderboard.map(founder => (
                    <div key={founder.id}>
                        <p>{founder.name} | founder @ {founder.company} | {founder.score}</p>
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}

export default Home;