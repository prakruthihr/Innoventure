// static/script.js

$(document).ready(function () {
    $('#searchInput').on('input', function () {
        search();
    });
});

function search() {
    var keyword = $('#searchInput').val();

    $.ajax({
        url: '/search',
        data: { keyword: keyword },
        success: function (data) {
            // Display search results in the same place as the candidate list
            $('#candidateList').html(data);
        }
    });
}


function handleFilter() {
    var filterMenu = document.getElementById("filterMenu");
    filterMenu.style.display = (filterMenu.style.display === "block") ? "none" : "block";
  }
  
  document.querySelectorAll('#filterMenu input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      filterCandidates();
    });
  });

  document.querySelectorAll('#filterMenu input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      filterCandidates();
    });
  });

  function filterCandidates() {
    var selectedPercentages = Array.from(document.querySelectorAll('#filterMenu input[type="checkbox"]:checked')).map(function (checkbox) {
      return checkbox.value;
    });

    // Fetch and display only the candidates that match the selected percentages
    var candidates = document.querySelectorAll('.table-container tbody tr');

    candidates.forEach(function (candidate) {
      var matchPercentage = parseFloat(candidate.querySelector('.match-chart').getAttribute('data-match-percentage'));

      // Show or hide candidates based on matching percentages
      var shouldDisplay = selectedPercentages.some(function (selectedRange) {
        var rangeValues = selectedRange.split('-');
        var min = parseFloat(rangeValues[0]);
        var max = parseFloat(rangeValues[1]);

        return matchPercentage >= min && matchPercentage <= max;
      });

      candidate.style.display = shouldDisplay ? 'table-row' : 'none';
    });
  }


  document.addEventListener('DOMContentLoaded', function() {
    var candidates = document.querySelectorAll('.table-container tbody tr');
    
    // Iterate through each candidate
    candidates.forEach(function(candidate) {
      var dynamicTimeElement = candidate.querySelector('.dynamic-time');
        var uploadDatetime = dynamicTimeElement.getAttribute('data-upload-datetime');
        var momentUploadDatetime = moment(uploadDatetime);
        var candidateId = dynamicTimeElement.getAttribute('data-candidate-id');
        console.log('Candidate Element:', candidate);
        console.log('Candidate ID:', candidateId);
        // Update the time difference every second for each candidate
        setInterval(function() {
            var timeDifference = moment().diff(momentUploadDatetime, 'seconds');
            var duration = moment.duration(timeDifference, 'seconds');
            var dynamicTime = '';

            if (duration.years() > 0) {
                dynamicTime = duration.years() + ' year' + (duration.years() > 1 ? 's' : '') + ' ago';
            } else if (duration.months() > 0) {
                dynamicTime = duration.months() + ' month' + (duration.months() > 1 ? 's' : '') + ' ago';
            } else if (duration.days() > 0) {
                dynamicTime = duration.days() + ' day' + (duration.days() > 1 ? 's' : '') + ' ago';
            } else if (duration.hours() > 0) {
                dynamicTime = duration.hours() + ' hour' + (duration.hours() > 1 ? 's' : '') + ' ago';
            } else if (duration.minutes() > 0) {
                dynamicTime = duration.minutes() + ' minute' + (duration.minutes() > 1 ? 's' : '') + ' ago';
            } else {
                dynamicTime = 'Just now';
            }
            
            // Update the HTML element with the dynamic time for the current candidate
            dynamicTimeElement.innerText = dynamicTime.trim();
        }, 1000); // Update every second // Update every second
    });
});