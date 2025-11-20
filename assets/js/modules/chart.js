let radarInstance;

export function initRadarChart(){
  const canvas = document.getElementById('skillsChart');
  if(!canvas) return;
  const styles = getComputedStyle(document.body);
  const accent = styles.getPropertyValue('--accent').trim() || '#ff6a00';
  const text = styles.getPropertyValue('--text').trim() || '#ffffff';
  const data = {
    labels: ['Linux','C','Python','Docker','Security','Networking'],
    datasets: [{
      label: 'Proficiency',
      data: [85,70,80,60,76,66],
      backgroundColor: 'rgba(255,106,0,0.18)',
      borderColor: accent,
      pointBackgroundColor: accent,
      pointBorderColor: text,
      borderWidth: 2
    }]
  };
  const options = {
    responsive: true,
    plugins: { legend: { labels: { color: text } } },
    scales: { r: { angleLines: { color: 'rgba(255,106,0,0.25)' }, grid: { color: 'rgba(255,106,0,0.25)' }, pointLabels: { color: text, font: { size: 12 } }, ticks: { display:false } } }
  };
  if(radarInstance) radarInstance.destroy();
  radarInstance = new Chart(canvas.getContext('2d'), { type:'radar', data, options });
}

export function refreshChartTheme(){
  initRadarChart();
}
