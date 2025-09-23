#Auto generated Octane revision tag
@TID241038REV0.11.0
Feature: Ambulance Calltaker Smoke Test 
    Scenario: Ambulance Calltaker Smoke Test
    	Given we are operating within the "T610" environment
        Given we are configured for "Ambulance Calltaker" operations
        And we are defined for agency "ERTCOMM" dgroups "all" for access "Write and Visible"
        When we click "Monitor" on form "Event Information"
        Then we can find "job 1" in "Caller Line Identification"
