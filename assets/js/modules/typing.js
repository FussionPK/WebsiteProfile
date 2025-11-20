export function initTyping(words, elementId='typed') {
  const el = document.getElementById(elementId);
  if(!el) return;
  let wordIndex = 0, letterIndex = 0, deleting = false;
  function loop(){
    const word = words[wordIndex];
    if(!deleting){
      letterIndex++;
      el.textContent = word.slice(0, letterIndex);
      if(letterIndex === word.length){ deleting = true; return setTimeout(loop,1500);}    
    } else {
      letterIndex--;
      el.textContent = word.slice(0, letterIndex);
      if(letterIndex === 0){ deleting = false; wordIndex = (wordIndex+1) % words.length; }
    }
    setTimeout(loop, deleting ? 55 : 110);
  }
  loop();
}
