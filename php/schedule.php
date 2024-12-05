 <!DOCTYPE html>
 <html lang="en">

 <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>Weekly Event Calendar</title>
   <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
   <link rel="shortcut icon" href="/public/calendar.png" type="image/x-icon" />
   <link rel="stylesheet" href="/src/css/schedule.css" />
 </head>

 <body>
   <?php if (isset($_SESSION['success_message'])): ?>
     <div class="alert success">
       <?php
        echo $_SESSION['success_message'];
        unset($_SESSION['success_message']);
        ?>
     </div>
   <?php endif; ?>

   <?php if (isset($_SESSION['error_message'])): ?>
     <div class="alert error">
       <?php
        echo $_SESSION['error_message'];
        unset($_SESSION['error_message']);
        ?>
     </div>
   <?php endif; ?>

   <div class="fixed-header">
     <h1 class="current-month"></h1>
     <div class="calendar" id="calendar-header"></div>
     <button id="add-event-btn"><i class="bx bx-plus"></i></button>
     <button id="theme-toggle">
       <i class="bx bx-sun"></i>
     </button>
   </div>
   <div class="calendar-container">
     <div class="calendar" id="calendar-body"></div>
   </div>
   <form id="add-event-form" action="includes/schedule.inc.php" method="POST" style="display:none">
     <h2>Add New Event</h2>
     <label for="event-name">Event Name:</label>
     <input type="text" id="event-name" name="event_name" required>

     <fieldset>
       <legend>Days:</legend>
       <label>
         <input type="checkbox" name="event-days[]" value="0">
         Sun
       </label>
       <label>
         <input type="checkbox" name="event-days[]" value="1">
         Mon
       </label>
       <label>
         <input type="checkbox" name="event-days[]" value="2">
         Tue
       </label>
       <label>
         <input type="checkbox" name="event-days[]" value="3">
         Wed
       </label>
       <label>
         <input type="checkbox" name="event-days[]" value="4">
         Thu
       </label>
       <label>
         <input type="checkbox" name="event-days[]" value="5">
         Fri
       </label>
       <label>
         <input type="checkbox" name="event-days[]" value="6">
         Sat
       </label>
     </fieldset>
     <label for="event-start">Start Time:</label>
     <input type="time" id="event-start" name="from" required>
     <label for="event-end">End Time:</label>
     <input type="time" id="event-end" required name="to">
     <label for="event-location">Location:</label>
     <input type="text" id="event-location" name="location">
     <div class="form-buttons">
       <button type="button" id="cancel-add-event">Cancel</button>
       <button type="submit">Add Event</button>
     </div>
   </form>

   <script>
     let events = [];
     <?php if (isset($formattedEvents)): ?>
       events = <?php echo json_encode($formattedEvents); ?>;
     <?php endif; ?>
     async function deleteEvent(eventId) {
       try {
         const response = await fetch('includes/schedule.inc.php', {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             id: eventId
           })
         });

         if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error || 'Failed to delete event');
         }

         // Remove event from local events array and update UI
         events = events.filter(event => event.id !== eventId);

       } catch (error) {
         console.error('Delete error:', error);
         alert(error.message);
       }
     }
   </script>
   <script src="/src/js/schedule.js"></script>

 </body>

 </html>