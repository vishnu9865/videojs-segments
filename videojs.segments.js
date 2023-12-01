function SegmentPlugin(player, playerId, segments) {
  // actual segment div
  function createSegmentDiv(segment, totalDuration) {
    const end = ((segment.end*100)/totalDuration);
    const start = ((segment.start*100)/totalDuration);
    const width = end - start;
  
    // create transparent segment element
    const segmentDiv = document.createElement('div');
    segmentDiv.classList.add('segment');
    segmentDiv.setAttribute('id', crypto.randomUUID());
    segmentDiv.style.width = `calc(${width.toFixed(2).toString()}% - 0.5vw)`;
    segmentDiv.style.left = start.toFixed(2).toString().concat('%');
  
    // show label on hover on segment
    segmentDiv.addEventListener(
      'mouseenter', 
      function(e) {
        const tooltip = document.getElementById(`${playerId}-tooltip`);
        tooltip.style.visibility = 'visible';
        tooltip.innerText = segment.label;
      }
    );
    // segment label follows the mouse on hover 
    segmentDiv.addEventListener(
      'mousemove',
      function(e) {
        const tooltip = document.getElementById(`${playerId}-tooltip`);
        tooltip.parentElement.style.left = `${e.pageX - segmentDiv.parentElement.getBoundingClientRect().left - (tooltip.clientWidth/2).toFixed(2)}px`;
      }
    );
    // hide label on mouse leave
    segmentDiv.addEventListener(
      'mouseleave', 
      function(e) {
        const tooltip = document.getElementById(`${playerId}-tooltip`);
        tooltip.style.visibility = 'hidden';
        tooltip.innerText = '';
      }
    );
  
    return segmentDiv;
  }
  
  // spacer element
  function createSegmentSpacer(endTime, totalDuration) {
    const end = ((endTime*100)/totalDuration);
    const segmentSpacerEl = document.createElement('div');
    
    segmentSpacerEl.classList.add('segment-spacer');
    segmentSpacerEl.setAttribute('id', crypto.randomUUID());
    segmentSpacerEl.style.left = `calc(${end.toFixed(2).toString().concat('%')} - 3px)`;
    
    return segmentSpacerEl;
  }
  
  // custom tooltip for displaying segment label
  function createTooltip() {
    const parentDiv = document.createElement('div');
    const tooltip = document.createElement('div');
    parentDiv.classList.add('vjs-mouse-display');
    parentDiv.appendChild(tooltip);
    parentDiv.style.visibility = 'hidden';
    tooltip.classList.add('vjs-time-tooltip');
    tooltip.setAttribute('id', '${playerId}-tooltip');
    tooltip.style.whiteSpace = 'nowrap'
    tooltip.style.top = '-6em';
    return parentDiv;
  }
  
  // main calling script
  player.one("loadedmetadata", function() {
    const totalDuration = this.duration();
    const progressControl = document.querySelector(`#${playerId} .vjs-progress-control .vjs-progress-holder`);
    progressControl.appendChild(createTooltip());
  
    segments.forEach(function (segment) {
      const divEl = createSegmentDiv(segment, totalDuration);
      progressControl.appendChild(divEl);
      if (segment.end != totalDuration) {
        progressControl.appendChild(createSegmentSpacer(segment.end, totalDuration));
      }
    });
  });
}

// give the actual time
function scrollToSegment(player, startTime) {
  player.currentTime(startTime);
}

export { 
  scrollToSegment 
};

export default SegmentPlugin;
