var gradeCount = 1;
            
                    function addGrade() {
                        var container = document.getElementById("grades-container");
                        var div = document.createElement("div");
                        var label1 = document.createElement("label");
                        var input1 = document.createElement("input");
                        var label2 = document.createElement("label");
                        var input2 = document.createElement("input");
            
                        label1.setAttribute("for", "grade" + (gradeCount + 1));
                        label1.textContent = "Grade " + (gradeCount + 1) + ": ";
                        input1.setAttribute("type", "number");
                        input1.setAttribute("name", "grades[]");
                        input1.setAttribute("min", "0");
                        input1.setAttribute("max", "100");
                        input1.setAttribute("step", "0.01");
                        input1.setAttribute("required", "");
            
                        label2.setAttribute("for", "weight" + (gradeCount + 1));
                        label2.textContent = " Weighted Total:";
                        input2.setAttribute("type", "number");
                        input2.setAttribute("name", "weights[]");
                        input2.setAttribute("min", "0");
                        input2.setAttribute("max", "100");
                        input2.setAttribute("step", "0.01");
                        input2.setAttribute("required", "");
            
                        div.appendChild(label1);
                        div.appendChild(input1);
                        div.appendChild(label2);
                        div.appendChild(input2);
                        container.appendChild(div);

                        // Add some margin-bottom to the new div element
                        div.style.marginBottom = "15px";
            
                        gradeCount++;
                    }
            
                    function calculateGrade() {
                        var grades = document.getElementsByName("grades[]");
                        var weights = document.getElementsByName("weights[]");
                        var gradeSum = 0;
                        var weightSum = 0;
            
                        for (var i = 0; i < grades.length; i++) {
                            gradeSum += parseFloat(grades[i].value) * parseFloat(weights[i].value);
                            weightSum += parseFloat(weights[i].value);
                        }
            
                        var finalGrade = gradeSum / weightSum;
            
                        document.getElementById("total").value = finalGrade.toFixed(2) + "%";
                    }