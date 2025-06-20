import React from "react";
import './LandingPage.css';
import { Link } from "react-router";

export default function LandingPage(){


    return(
        <>
            <section class="hero">
                <div class="container">
                    <h1>Organize Your Life with Evently</h1>
                    <p>The simplest way to manage your daily events, meetings, and appointments in one beautiful calendar interface.</p>
                    <div class="hero-buttons">
                        <Link to='/login' className="primary--button">Get Started for free</Link>
                    </div>
                </div>
            </section>

            <section class="features" id="features">
                <div class="container">
                    <div class="section-title">
                        <h2>Powerful Features</h2>
                        <p>Evently comes packed with everything you need to stay organized and productive</p>
                    </div>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="material-symbols-outlined">calendar_month</i>
                            </div>
                            <h3>Smart Calendar</h3>
                            <p>View your events in day, week, or month format with color coding for easy organization.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="material-symbols-outlined">group</i>
                            </div>
                            <h3>Collaboration</h3>
                            <p>Share events with colleagues or family members and manage schedules together.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="material-symbols-outlined">shoppingmode</i>
                            </div>
                            <h3>Custom Categories</h3>
                            <p>Organize events with custom categories for better filtering and search.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="how-it-works" id="how-it-works">
                <div class="container">
                    <div class="section-title">
                        <h2>How Evently Works</h2>
                        <p>Get started in just a few simple steps</p>
                    </div>
                    <div class="steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div>
                                <h3>Create an Account</h3>
                                <p>Sign up for free with your email or social media account. No credit card required.</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div>
                                <h3>Add Your Events</h3>
                                <p>Quickly add events with details like title, time, location, and description.</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div>
                                <h3>Stay Organized</h3>
                                <p>View your schedule at a glance, drag-and-drop to reschedule, and enjoy peace of mind.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="cta">
                <div class="container">
                    <h2>Ready to Transform Your Scheduling?</h2>
                    <p>Join thousands of users who are already managing their time more effectively with Evently.</p>
                    <Link to='/login' className="outline--button">Get Started</Link>
                </div>
            </section>
        </>

    )
}