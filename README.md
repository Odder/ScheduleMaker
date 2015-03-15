# ScheduleMaker

Controls
--------------
Schedule Maker is using similar shortcuts as Excel, which goes like:
- [Enter] -> Jump to cell below (If you are already on the last row, then a new row will be created)
- [Shift]/[Ctrl] + [Enter] -> Jump to cell above
- [Tab] -> Jump to next cell
- [Shift]/[Ctrl] + [Enter] -> Jump to previous cell

Intelligent Input
--------------
Schedule Maker makes sure that everything you input will be correct, also, it has a lot of shortcuts for you so you don't have to waste time and spelling out things.

**Event Name**
- This uses a free-format input, however, you will need to use the proper naming for official events (autocomplete function will help you with that)

**Round Name**
- This is calculated automatically by Schedule Maker in order to make sure the WCA round naming convention is being kept.
- This will only be calculated for official events

**Format**
- Free format
- Type 1,2,3,5 to explain what type of format it is (1 -> Best of 1, 3 -> Mean of 3, 5-> Average of 5)

**Start**
- Input your time as: hhmm, it will automatically get corrected, 09:00 can be written as: 900
- Will only be editable for the beginning of a day, rest will be calculated based on durations

**Duration**
- Enter you input as: hhmm, it will automatically get correct, 30 minutes can be written as 30 while 2 hours will be written as 200

**Cutoff**
- Enter your input as: mmss, it will automatically get correct, 30 seconds can be written as 30, while 1:30 will be written as 130
- Cutoff is only required for combined rounds

**Hard Time Limit**
- Enter your input as: mmss, it will automatically get correct, 30 seconds can be written as 30, while 1:30 will be written as 130

**Qualifiers**
- Amount of people qualifying for this round

Easy re-organisation of schedule
--------------
If you ever decide to change the Duration of an event, you just change it and everything will updated accordingly.

Deciding to delete round? Well, don't worry, everything else will change accordingly.

Ahh, you want to move 3x3x3 to early in the day? No worries, you just drag the entire row and drop it wherever you want it to move to! And guess what, everything will change accordingly.

Storage of Schedule
--------------
Schedule Maker stores all its information as JSON. All the information is stored in the Local Storage, so every Schedule is bound to a computer, but you always just share you JSON with your co-organiser/delegate and they can load the Schedule using that JSON :-) This needs to be optimised...

However, this thing does NOT need an internet connection to work. It's works as well without as with internet!