// Simple GitHub data fetcher. Assumes a public profile and unauthenticated rate limits.
// Fetch user, repos (for count), and approximate commit activity via events.
export async function fetchGitHubStats(username){
  const base = 'https://api.github.com/users/'+username;
  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(base),
      fetch(base + '/repos?per_page=100'),
      fetch('https://api.github.com/users/'+username+'/events?per_page=100')
    ]);
    if(!userRes.ok) throw new Error('User lookup failed');
    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];
    const events = eventsRes.ok ? await eventsRes.json() : [];
    // Rough commit count from PushEvents
    let commits = 0;
    events.filter(e=>e.type==='PushEvent').forEach(e=>{ commits += e.payload.size || 0; });
    return {
      commits,
      repos: repos.length,
      followers: user.followers || 0,
      avatar: user.avatar_url,
      name: user.name || user.login,
      bio: user.bio || '',
      url: user.html_url
    };
  } catch(err){
    console.error('GitHub fetch error', err);
    return { commits: 0, repos: 0, followers: 0 };
  }
}
