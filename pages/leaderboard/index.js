// import { supabase } from '/Users/dylanmolina/codeprojects/flywheels/lib/supabaseClient.js';
import { supabase } from '../../lib/supabaseClient';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

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
        <Link className={styles.homelink} href="/">
          🎡 flywheel
          </Link>
        {leaderboard && (
            <div>
                {leaderboard.map(founder => (
                    <div key={founder.id}>
                        <p className={styles.founder}> <span >{founder.name}</span> | founder @ <a className={styles.linktext} href={founder.link}>{founder.company}</a> | <span style = {{ color: `${founder.color}`, fontWeight: 900 }}>{founder.score}</span> </p>
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}

export default Home;